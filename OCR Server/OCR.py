from google.cloud import vision
import io
import os
def detect_text(path):
    """Detects text in the file."""
    client = vision.ImageAnnotatorClient()

    with io.open(path, 'rb') as image_file:
        content = image_file.read()

    image = vision.types.Image(content=content)

    response = client.document_text_detection(image=image)
    texts = response.text_annotations
    print('Texts:')

    for text in texts:
        print('\n"{}"'.format(text.description))

        # vertices = (['({},{})'.format(vertex.x, vertex.y)
        #             for vertex in text.bounding_poly.vertices])

        # print('bounds: {}'.format(','.join(vertices)))

cwd = os.getcwd()
path = cwd + "/Receipts/1.jpg"
detect_text(path)