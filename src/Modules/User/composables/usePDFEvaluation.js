import { computed } from "vue";
import { useStore } from "vuex";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const usePDFEvaluation = () => {
  const store = useStore();

  const generatePDFEvaluation = () => {
    const evaluation = computed(() => store.getters["indicator/evaluation"]);
    const name = computed(() => store.getters["auth/name"]);
    const namePDF = "Evaluación Profesoral " + name.value + " 2022";
    const indDocenteEducat = [];
    const indPolitIdeol = [];
    const indMetodologico = [];
    const indInvestig = [];
    const indSuperacion = [];
    const indExtUniv = [];

    evaluation.value.indicators.forEach((element) => {
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
    });

    let docDefinition = {
      info: {
        title:
          "Evaluación profesoral de " +
          evaluation.value.user.name +
          " en el año 2022",
        author: name.value,
        creator: "SGEOA",
        producer: "SGEOA",
      },
      content: [
        {
          style: "tableExample",
          table: {
            widths: ["*", "*", "*"],
            body: [
              [
                {
                  text: "FACULTAD:",
                  italics: true,
                  fontSize: 10,
                  bold: true,
                  fillColor: "#CCCCCC",
                },
                {
                  text: "CENTRO/ DEPARTAMENTO:",
                  italics: true,
                  fontSize: 10,
                  bold: true,
                  fillColor: "#CCCCCC",
                },
                {
                  text: "PERIODO:",
                  italics: true,
                  fontSize: 10,
                  bold: true,
                  fillColor: "#CCCCCC",
                },
              ],
              [
                {
                  text: evaluation.value.user.faculty,
                  italics: true,
                  fontSize: 10,
                },
                {
                  text: evaluation.value.user.department,
                  italics: true,
                  fontSize: 10,
                },
                {
                  text: "2022",
                  italics: true,
                  fontSize: 10,
                },
              ],
            ],
          },
        },
        {
          style: "tableExample",
          table: {
            widths: ["*", 120, 120],
            body: [
              [
                {
                  text: "NOMBRES Y APELLIDOS:",
                  italics: true,
                  fontSize: 10,
                  bold: true,
                  fillColor: "#CCCCCC",
                },
                {
                  text: "SOLAPÍN:",
                  italics: true,
                  fontSize: 10,
                  bold: true,
                  fillColor: "#CCCCCC",
                },
                {
                  text: "CATEGORÍA DOCENTE:",
                  italics: true,
                  fontSize: 10,
                  bold: true,
                  fillColor: "#CCCCCC",
                },
              ],
              [
                {
                  text: evaluation.value.user.name,
                  italics: true,
                  fontSize: 10,
                },
                {
                  text: "T111933",
                  italics: true,
                  fontSize: 10,
                },
                {
                  text: evaluation.value.user.category,
                  italics: true,
                  fontSize: 10,
                },
              ],
            ],
          },
        },
        {
          text: "Desarrollo de la Evaluación del Profesor",
          margin: [0, 10, 0, 10],
        },

        //Indicadores por Categoria
        {
          style: "tableExample",
          table: {
            widths: ["*", 100],
            body: [
              [
                {
                  text: "TRABAJO DOCENTE-EDUCATIVO EN PREGRADO Y POSGRADO:",
                  italics: true,
                  fontSize: 10,
                  bold: true,
                  fillColor: "#CCCCCC",
                },
                {
                  text: evaluation.value.indicators[0].value,
                  italics: true,
                  fontSize: 10,
                  bold: true,
                  fillColor: "#CCCCCC",
                },
              ],
            ],
          },
        },
        {
          style: "tableExample",
          table: {
            widths: ["*"],
            body: [
              [
                {
                  ul: indDocenteEducat,
                  fontSize: 10,
                },
              ],
            ],
          },
        },

        //Indicadores por Categoria
        {
          style: "tableExample",
          table: {
            widths: ["*", 100],
            body: [
              [
                {
                  text: "TRABAJO POLÍTICO-IDEOLÓGICO:",
                  italics: true,
                  fontSize: 10,
                  bold: true,
                  fillColor: "#CCCCCC",
                },
                {
                  text: evaluation.value.indicators[1].value,
                  italics: true,
                  fontSize: 10,
                  bold: true,
                  fillColor: "#CCCCCC",
                },
              ],
            ],
          },
        },
        {
          style: "tableExample",
          table: {
            widths: ["*"],
            body: [
              [
                {
                  ul: indPolitIdeol,
                  fontSize: 10,
                },
              ],
            ],
          },
        },

        //Indicadores por Categoria
        {
          style: "tableExample",
          table: {
            widths: ["*", 100],
            body: [
              [
                {
                  text: "TRABAJO METODOLÓGICO",
                  italics: true,
                  fontSize: 10,
                  bold: true,
                  fillColor: "#CCCCCC",
                },
                {
                  text: evaluation.value.indicators[2].value,
                  italics: true,
                  fontSize: 10,
                  bold: true,
                  fillColor: "#CCCCCC",
                },
              ],
            ],
          },
        },
        {
          style: "tableExample",
          table: {
            widths: ["*"],
            body: [
              [
                {
                  ul: indMetodologico,
                  fontSize: 10,
                },
              ],
            ],
          },
        },

        //Indicadores por Categoria
        {
          style: "tableExample",
          table: {
            widths: ["*", 100],
            body: [
              [
                {
                  text: "TRABAJO DE INVESTIGACIÓN E INNOVACIÓN:",
                  italics: true,
                  fontSize: 10,
                  bold: true,
                  fillColor: "#CCCCCC",
                },
                {
                  text: evaluation.value.indicators[3].value,
                  italics: true,
                  fontSize: 10,
                  bold: true,
                  fillColor: "#CCCCCC",
                },
              ],
            ],
          },
        },
        {
          style: "tableExample",
          table: {
            widths: ["*"],
            body: [
              [
                {
                  ul: indInvestig,
                  fontSize: 10,
                },
              ],
            ],
          },
        },

        //Indicadores por Categoria
        {
          style: "tableExample",
          table: {
            widths: ["*", 100],
            body: [
              [
                {
                  text: "SUPERACIÓN:",
                  italics: true,
                  fontSize: 10,
                  bold: true,
                  fillColor: "#CCCCCC",
                },
                {
                  text: evaluation.value.indicators[4].value,
                  italics: true,
                  fontSize: 10,
                  bold: true,
                  fillColor: "#CCCCCC",
                },
              ],
            ],
          },
        },
        {
          style: "tableExample",
          table: {
            widths: ["*"],
            body: [
              [
                {
                  ul: indSuperacion,
                  fontSize: 10,
                },
              ],
            ],
          },
        },

        //Indicadores por Categoria
        {
          style: "tableExample",
          table: {
            widths: ["*", 100],
            body: [
              [
                {
                  text: "EXTENSIÓN UNIVERSITARIA:",
                  italics: true,
                  fontSize: 10,
                  bold: true,
                  fillColor: "#CCCCCC",
                },
                {
                  text: evaluation.value.indicators[5].value,
                  italics: true,
                  fontSize: 10,
                  bold: true,
                  fillColor: "#CCCCCC",
                },
              ],
            ],
          },
        },
        {
          style: "tableExample",
          table: {
            widths: ["*"],
            body: [
              [
                {
                  ul: indExtUniv,
                  fontSize: 10,
                },
              ],
            ],
          },
        },

        {
          text:
            "Resultado de la Evaluación del curso: " + evaluation.value.value,
          margin: [0, 10, 0, 10],
        },
      ],
    };

    pdfMake.createPdf(docDefinition).download(namePDF);
  };

  return {
    generatePDFEvaluation,
    evaluation: computed(() => store.getters["indicator/evaluation"]),
  };
};

export default usePDFEvaluation;
