import { computed } from "vue";
import { useStore } from "vuex";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const usePDFEvaluationArea = () => {
  const store = useStore();

  const generatePDFEvaluationArea = () => {
    const area = computed(() => store.getters["area/area"]);
    const content = [{ text: "ARC:  " + area.value.name, style: "header" }];

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

    pdfMake.createPdf(docDefinition).download();
  };

  return {
    generatePDFEvaluationArea,
    //evaluation: computed(() => store.getters["indicator/evaluation"]),
  };
};

export default usePDFEvaluationArea;
