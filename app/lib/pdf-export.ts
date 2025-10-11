import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export async function exportDashboardToPDF(
  fileName: string = "oee-dashboard.pdf"
): Promise<void> {
  try {
    const element = document.getElementById("dashboard-content");
    if (!element) {
      throw new Error("Dashboard content not found");
    }

    // Get dimensions
    const canvas = await html2canvas(element, {
      backgroundColor: "#ffffff",
      scale: 2,
      useCORS: true,
      allowTaint: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;

    const pdf = new jsPDF("p", "mm", "a4");

    // Add title and date
    pdf.setFontSize(16);
    pdf.text("OEE Monitoring Dashboard Report", 15, 10);
    pdf.setFontSize(10);
    pdf.text(`Generated: ${new Date().toLocaleString()}`, 15, 20);

    // Add content
    const pageHeight_pdf = pdf.internal.pageSize.getHeight();
    let position_pdf = 30;

    while (heightLeft > 0) {
      if (position_pdf + imgHeight > pageHeight_pdf - 10) {
        pdf.addPage();
        position_pdf = 10;
      }

      pdf.addImage(imgData, "PNG", 10, position_pdf, imgWidth - 20, imgHeight);
      heightLeft -= imgHeight;
      position_pdf += imgHeight;
    }

    pdf.save(fileName);
  } catch (error) {
    console.error("PDF export error:", error);
    throw error;
  }
}