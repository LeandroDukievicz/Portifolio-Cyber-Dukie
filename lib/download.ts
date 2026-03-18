export function downloadCV() {
  const a = document.createElement("a");
  a.href = "/Leandro%20Dukievicz%20-%20Desenvolvedor%20Web.pdf";
  a.download = "Leandro-Dukievicz-CV.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
