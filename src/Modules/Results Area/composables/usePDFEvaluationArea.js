import { computed } from "vue";
import { useStore } from "vuex";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const usePDFEvaluationArea = () => {
  const store = useStore();

  const generatePDFEvaluationArea = () => {
    const area = computed(() => store.getters["area/area"]);
    const indDocenteEducat = [];
    const indPolitIdeol = [];
    const indMetodologico = [];
    const indInvestig = [];
    const indSuperacion = [];
    const indExtUniv = [];

    console.log(area.value);

    /*    evaluation.value.indicators.forEach((element) => {
      if (
        element.category === "TRABAJO DOCENTE-EDUCATIVO EN PREGRADO Y POSGRADO"
      ) {
        element.indicators.forEach((indicator) => {
          indDocenteEducat.push(indicator.name);
        });
      }
      if (element.category === "TRABAJO POLÍTICO-IDEOLÓGICO") {
        element.indicators.forEach((indicator) => {
          indPolitIdeol.push(indicator.name);
        });
      }
      if (element.category === "TRABAJO METODOLÓGICO") {
        element.indicators.forEach((indicator) => {
          indMetodologico.push(indicator.name);
        });
      }
      if (element.category === "TRABAJO DE INVESTIGACIÓN E INNOVACIÓN") {
        element.indicators.forEach((indicator) => {
          indInvestig.push(indicator.name);
        });
      }
      if (element.category === "SUPERACIÓN") {
        element.indicators.forEach((indicator) => {
          indSuperacion.push(indicator.name);
        });
      }
      if (element.category === "EXTENSIÓN UNIVERSITARIA") {
        element.indicators.forEach((indicator) => {
          indExtUniv.push(indicator.name);
        });
      }
    }); */

    let docDefinition = {
      content: [{ text: "ARC", text: area.value.name, style: "header" }],
    };

    pdfMake.createPdf(docDefinition).open() /* .download() */;
  };

  return {
    generatePDFEvaluationArea,
    //evaluation: computed(() => store.getters["indicator/evaluation"]),
  };
};

export default usePDFEvaluationArea;
