from PyPDF2 import PdfWriter, PdfReader
import aspose.pdf as ap
import os
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.graphics.shapes import *
import random
import string
import shutil
from dotenv import load_dotenv

load_dotenv()  # take environment variables from .env.

def get_random_string(length):
    # choose from all lowercase letter
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(length))
    return result_str

def create_watermark(file):
    c = canvas.Canvas(file, A4)
    c.setFillColorRGB(1, 1, 1)
    c.rect(0, 820, 300, 30, stroke=0, fill=1)
    c.save()

def censor_image_and_text(infile, outfile):

    path_infile = infile
    path_outfile = outfile

    # Open document
    document = ap.Document(path_infile)

    # Define thing that searches for name
    nameAbsorber = ap.text.TextFragmentAbsorber(os.getenv("NAME"))
    name2Absorber = ap.text.TextFragmentAbsorber(os.getenv("NAME2"))
    schoolAbsorber = ap.text.TextFragmentAbsorber(os.getenv("SCHOOL"))
    classAbsorber = ap.text.TextFragmentAbsorber(os.getenv("CLASS"))
    mirsadAbsorber = ap.text.TextFragmentAbsorber(os.getenv("TEACHER"))

    document.pages.accept(nameAbsorber)
    document.pages.accept(name2Absorber)
    document.pages.accept(schoolAbsorber)
    document.pages.accept(classAbsorber)
    document.pages.accept(mirsadAbsorber)

    # Delete all header images
    for page in document.pages:
        page.resources.images.delete(1)
    

    # Get reference to the found list
    nameFragmentCollection = nameAbsorber.text_fragments
    name2FragmentCollection = name2Absorber.text_fragments
    schoolFragmentCollection = schoolAbsorber.text_fragments
    classFragmentCollection = classAbsorber.text_fragments
    mirsadFragmentCollection = mirsadAbsorber.text_fragments

    # Parse all the searched text fragments
    for txtFragment in nameFragmentCollection:
        txtFragment.text = ""
    for txtFragment in name2FragmentCollection:
        txtFragment.text = ""
    for txtFragment in schoolFragmentCollection:
        txtFragment.text = ""
    for txtFragment in classFragmentCollection:
        txtFragment.text = ""
    for txtFragment in mirsadFragmentCollection:
        txtFragment.text = ""

    # Save updated PDF file
    document.save(path_outfile)

def remove_watermark(infile, outfile):
    watermarkPdf = PdfReader("watermark.pdf")
    existing_pdf = PdfReader(infile)
    output = PdfWriter()

    for page in existing_pdf.pages:
        page.merge_page(watermarkPdf.pages[0])
        output.add_page(page)

    outputStream = open(outfile, "wb")
    output.write(outputStream)
    outputStream.close()

def censor_pdf(infile, outfile):
    try:
        create_watermark("watermark.pdf")
        temp = "_temp-" + get_random_string(5)
        censor_image_and_text(infile, temp)
        remove_watermark(temp, outfile)
        os.remove(temp)
    except:
        print('Somthing happened, idk man ¯\_(ツ)_/¯')


def stupid_mkdir(path):
    if not os.path.exists(path):
        os.mkdir(path)

directory = 'C:/Users/akkor/AARHUS TECH/Mirsad Kadribasic - AndersL/'
outputDir = 'mat-opgaver'

blacklist = [
    'ProgrammeringsEksamen',
    'SRCase',
    'P1mundtlig',
    'P2Mundtlig',
    'P3Mundtlig',
    'P4Mundtlig',
    'P5Mundtlig',
    'P6Mundtlig',
    'P7Mundtlig',
    'MundtligMatematik',
    'BeviserMundtlig'
]

for filename in os.scandir(directory):
    if filename.is_dir():
        subDir = filename.path
        subDirName = filename.name

        if subDirName in blacklist:
            print("Skipping " + subDirName)
            continue

        stupid_mkdir(os.path.join(outputDir, subDirName))
        print("Looking in " + subDirName)
        for filename in os.scandir(subDir):
            if filename.is_file():
                if filename.name.endswith("a.pdf"):
                    print("    Censoring file " + filename.name)
                    censor_pdf(filename.path, os.path.join(outputDir, subDirName, filename.name))
                else:
                    shutil.copy2(filename.path, os.path.join(outputDir, subDirName, filename.name))

os.remove('watermark.pdf')