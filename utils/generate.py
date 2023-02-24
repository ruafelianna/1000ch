import csv
import os.path


conf = {
    'tree': {
        'script': {
            'parent': None,
            'path': os.path.abspath(os.path.dirname(__file__)),
        },
        'root': {
            'parent': 'script',
            'rel': '..',
        },
        'templates': {
            'parent': 'root',
            'rel': '*',
            'files': {
                'html': [
                    'index',
                    'card',
                    'input',
                ],
            },
        },
        'data': {
            'parent': 'root',
            'rel': '*',
            'files': {
                'csv': [
                    'data',
                ],
            },
        },
        'result': {
            'parent': 'root',
            'rel': 'public',
            'files': [
                'index.html',
            ],
        },
    },
}


def init(conf):
    for category_name, category in conf.items():
        if category_name == 'tree':
            for dirname, directory in category.items():
                if directory['parent']:
                    if directory['rel'] == '*':
                        directory['rel'] = dirname
                    directory['path'] = os.path.join(category[directory['parent']]['path'], directory['rel'])
                    directory['fpaths'] = {}
                    if 'files' in directory:
                        if isinstance(directory['files'], dict):
                            for extname, ext in directory['files'].items():
                                for fname in ext:
                                    fullname = fname + '.' + extname
                                    directory['fpaths'][fullname] = os.path.join(directory['path'], fullname)
                        elif (
                            isinstance(directory['files'], list)
                            or isinstance(directory['files'], tuple)
                        ):
                            for fname in directory['files']:
                                directory['fpaths'][fname] = os.path.join(directory['path'], fname)


def generate():
    header, data = read_data(conf['tree']['data']['fpaths']['data.csv'])
    tpl = {}
    for name, path in conf['tree']['templates']['fpaths'].items():
        tpl[name] = read_content(path)
    cards = []
    length = len(header)
    for row in data:
        inputs = []
        for index in range(length):
            if header[index] == 'number':
                number = row[index]
            else:
                input = tpl['input.html'].replace('{{placeholder}}', header[index])
                input = input.replace('{{answer}}', row[index])
                inputs.append(input)
        card = tpl['card.html'].replace('{{inputs}}', '\n'.join(inputs))
        card = card.replace('{{number}}', number)
        cards.append(card)
    result = tpl['index.html'].replace('{{cards}}', '\n'.join(cards))
    write_content(conf['tree']['result']['fpaths']['index.html'], result)


def read_data(filename):
    with open(filename, 'r', encoding='utf-8', newline='') as fp:
        reader = csv.reader(fp, delimiter=';', quotechar='"')
        header = reader.__next__()
        data = []
        for row in reader:
            data.append(row)
    return header, data


def read_content(filename):
    with open(filename, 'r', encoding='utf-8') as fp:
        content = fp.read()
    return content


def write_content(filename, content):
    with open(filename, 'w', encoding='utf-8') as fp:
        fp.write(content)


if __name__ == '__main__':
    init(conf)
    generate()
