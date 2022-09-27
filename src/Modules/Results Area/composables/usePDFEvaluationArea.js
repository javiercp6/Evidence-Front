import { computed } from "vue";
import { useStore } from "vuex";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const usePDFEvaluationArea = () => {
  const store = useStore();

  const generatePDFEvaluationArea = () => {
    const area = computed(() => store.getters["area/area"]);
    const name = computed(() => store.getters["auth/name"]);
    const content = [{ text: "ARC:  " + area.value.name, style: "header" }];
    const namePDF = "ARC " + area.value.name + " 2022";

    area.value.objectives.forEach((a, index) => {
      let criterios = [];
      content.push(
        { text: "\n\nObjetivo" + " " + (index + 1), style: "subheader" },
        { text: a.name },
        { text: "\nCriterios de medida", style: "subheader" }
      );
      a.criterions.forEach((c) => {
        criterios.push(c.name + " (" + c.status + ")");
      });
      content.push({
        ul: criterios,
      });
      criterios = [];
    });

    let docDefinition = {
      info: {
        title:
          "Cumplimiento de los objetivos del Área " +
          area.value.name +
          " en el año 2022",
        author: name.value,
        creator: "SGEOA",
        producer: "SGEOA",
      },
      content,
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 15,
          bold: true,
        },
        quote: {
          italics: true,
        },
        small: {
          fontSize: 8,
        },
      },
    };

    pdfMake.createPdf(docDefinition).download(namePDF);
  };

  return {
    generatePDFEvaluationArea,
    //evaluation: computed(() => store.getters["indicator/evaluation"]),
  };
};

export default usePDFEvaluationArea;
