import asyncio
import weasyprint


async def format_resume_as_pdf(content: str, fullname: str) -> str:
    """Format AI-generated content into a structured PDF using WeasyPrint"""
    html_content = f"""
    <html>
    <head>
        <style>
            body {{ font-family: 'Arial', sans-serif; line-height: 1.6; }}
            h1 {{ text-align: center; color: #2C3E50; }}
            p {{ font-size: 14px; }}
        </style>
    </head>
    <body>
        <h1>Resume: {fullname}</h1>
        <p>{content.replace("\n", "<br>")}</p>
    </body>
    </html>
    """
    pdf_file = f"{fullname.replace(' ', '_')}_resume.pdf"
    weasyprint.HTML(string=html_content).write_pdf(pdf_file)
    return pdf_file
