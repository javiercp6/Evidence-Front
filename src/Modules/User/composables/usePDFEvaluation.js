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
    const fecha = new Date();
    const hoy = new Date(Date.now());
    const namePDF =
      "Evaluación Profesoral " + evaluation.value.user.name + " 2022";
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
          if (indicator.observation) {
            indDocenteEducat.push([
              indicator.name,
              { ul: [indicator.observation] },
            ]);
          } else {
            indDocenteEducat.push(indicator.name);
          }
        });
      }
      if (element.category === "TRABAJO POLÍTICO-IDEOLÓGICO") {
        element.indicators.forEach((indicator) => {
          if (indicator.observation) {
            indPolitIdeol.push([
              indicator.name,
              { ul: [indicator.observation] },
            ]);
          } else {
            indPolitIdeol.push(indicator.name);
          }
        });
      }
      if (element.category === "TRABAJO METODOLÓGICO") {
        element.indicators.forEach((indicator) => {
          if (indicator.observation) {
            indMetodologico.push([
              indicator.name,
              { ul: [indicator.observation] },
            ]);
          } else {
            indMetodologico.push(indicator.name);
          }
        });
      }
      if (element.category === "TRABAJO DE INVESTIGACIÓN E INNOVACIÓN") {
        element.indicators.forEach((indicator) => {
          if (indicator.observation) {
            indInvestig.push([indicator.name, { ul: [indicator.observation] }]);
          } else {
            indInvestig.push(indicator.name);
          }
        });
      }
      if (element.category === "SUPERACIÓN") {
        element.indicators.forEach((indicator) => {
          if (indicator.observation) {
            indSuperacion.push([
              indicator.name,
              { ul: [indicator.observation] },
            ]);
          } else {
            indSuperacion.push(indicator.name);
          }
        });
      }
      if (element.category === "EXTENSIÓN UNIVERSITARIA") {
        element.indicators.forEach((indicator) => {
          if (indicator.observation) {
            indExtUniv.push([indicator.name, { ul: [indicator.observation] }]);
          } else {
            indExtUniv.push(indicator.name);
          }
        });
      }
    });

    let docDefinition = {
      info: {
        title:
          "Evaluación profesoral de " +
          evaluation.value.user.name +
          " en el año " +
          fecha.getFullYear(),
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
                  text: fecha.getFullYear(),
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
                  text: "NOMBRE Y APELLIDOS:",
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
                  ol: indDocenteEducat,
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
                  ol: indPolitIdeol,
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
                  ol: indMetodologico,
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
                  ol: indInvestig,
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
                  ol: indSuperacion,
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
                  ol: indExtUniv,
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

        {
          style: "tableExample",
          table: {
            widths: [350, "*"],

            body: [
              [
                {
                  text: "OPINIÓN DEL EVALUADO:",
                  italics: true,
                  fontSize: 10,
                  bold: true,
                  fillColor: "#CCCCCC",
                  border: [true, true, true, true],
                },
                {
                  border: [false, false, false, false],

                  text: "",
                },
              ],
            ],
          },
          layout: {
            defaultBorder: false,
          },
        },
        {
          style: "tableExample",
          table: {
            widths: [350, "*"],
            heights: 100,

            body: [
              [
                {
                  border: [true, true, true, true],

                  text: "",
                },
                {
                  border: [false, false, false, false],

                  type: "circle",
                  ul: ["Conforme.", "Discrepa y apela", "Discrepa y no apela."],
                  margin: [20, 20, 0, 0],
                },
              ],
            ],
          },
          layout: {
            defaultBorder: false,
          },
        },

        {
          text: "Evaluador ",
          margin: [0, 20, 0, 10],
          bold: true,
        },

        {
          style: "tableExample",
          table: {
            widths: [225, 115, 20, "*"],

            body: [
              [
                {
                  colSpan: 2,
                  text: "NOMBRE Y APELLIDOS:",
                  italics: true,
                  fontSize: 10,
                  bold: true,
                  fillColor: "#CCCCCC",
                  border: [true, true, true, true],
                },
                {
                  border: [false, false, false, false],

                  text: "",
                },
                {
                  border: [false, false, false, false],

                  text: "",
                },
                {
                  rowSpan: 4,
                  border: [true, true, true, true],
                  fontSize: 8,

                  text: "Cuño de la facultad o del Área",
                },
              ],
              [
                {
                  colSpan: 2,
                  text: name.value,
                  fontSize: 10,

                  border: [true, true, true, true],
                },
                {
                  border: [false, false, false, false],

                  text: "ddddd",
                },
                {
                  border: [false, false, false, false],

                  text: "",
                },
                {
                  border: [false, false, false, false],

                  text: "ddddd",
                },
              ],
              [
                {
                  text: "CARGO:",
                  italics: true,
                  fontSize: 10,
                  bold: true,
                  fillColor: "#CCCCCC",
                  border: [true, true, true, true],
                },
                {
                  text: "FECHA:",
                  italics: true,
                  fontSize: 10,
                  bold: true,
                  fillColor: "#CCCCCC",
                  border: [true, true, true, true],
                },
                {
                  border: [false, false, false, false],

                  text: "",
                },
                {
                  border: [false, false, false, false],

                  text: "xxxx",
                },
              ],
              [
                {
                  text: "Decana Facultad 4",
                  fontSize: 10,
                  border: [true, true, true, true],
                },
                {
                  border: [true, true, true, true],
                  fontSize: 10,
                  text: hoy.toLocaleDateString(),
                },
                {
                  border: [false, false, false, false],

                  text: "",
                },
                {
                  border: [false, false, false, false],

                  text: "",
                },
              ],
            ],
          },
          layout: {
            defaultBorder: false,
          },
        },

        {
          text: "Evaluado",
          margin: [0, 20, 0, 10],
          bold: true,
        },

        {
          style: "tableExample",
          table: {
            widths: [225, 115, 20, "*"],

            body: [
              [
                {
                  colSpan: 2,
                  text: "NOMBRE Y APELLIDOS  DEL EVALUADO:",
                  italics: true,
                  fontSize: 10,
                  bold: true,
                  fillColor: "#CCCCCC",
                  border: [true, true, true, true],
                },
                {
                  border: [false, false, false, false],

                  text: "",
                },
                {
                  border: [false, false, false, false],

                  text: "",
                },
                {
                  rowSpan: 4,
                  border: [true, true, true, true],
                  fontSize: 8,

                  text: "",
                },
              ],
              [
                {
                  colSpan: 2,
                  text: evaluation.value.user.name,
                  fontSize: 10,

                  border: [true, true, true, true],
                },
                {
                  border: [false, false, false, false],

                  text: "",
                },
                {
                  border: [false, false, false, false],

                  text: "",
                },
                {
                  border: [false, false, false, false],

                  text: "",
                },
              ],
              [
                {
                  text: "",
                  border: [false, false, false, false],
                },
                {
                  text: "",
                  border: [false, false, false, false],
                },
                {
                  border: [false, false, false, false],

                  text: "",
                },
                {
                  border: [false, false, false, false],

                  text: "",
                },
              ],
              [
                {
                  text: " ",

                  border: [false, false, false, false],
                },
                {
                  border: [false, false, false, false],

                  text: " ",
                },
                {
                  border: [false, false, false, false],

                  text: "",
                },
                {
                  border: [false, false, false, false],

                  text: "",
                },
              ],
            ],
          },
          layout: {
            defaultBorder: false,
          },
        },

        {
          text: "CERTIFICO:",
          style: "header",
          alignment: "center",
          bold: true,
          margin: [0, 60, 0, 0],
        },

        {
          text: [
            `Yo:  Yaimí Trujillo Casañola  que ocupo el cargo de Decana Facultad 4 certifico que (el/la) profesor(a)  ${
              evaluation.value.user.name
            } obtiene la evaluación de ${
              evaluation.value.value
            } en el año ${fecha.getFullYear()}.`,
          ],
          style: "header",
          bold: true,
        },

        {
          text: "Conclusiones Derivadas de la Evaluación",
          style: "header",

          bold: true,
          margin: [0, 30, 0, 10],
        },

        {
          style: "tableExample",
          table: {
            widths: ["*", "*"],

            body: [
              [
                {
                  text: "Marque con una (X)",
                  italics: true,
                  fontSize: 10,

                  border: [true, true, false, false],
                },
                {
                  border: [false, true, true, false],

                  text: "",
                },
              ],
              [
                {
                  type: "circle",
                  ul: [
                    "Pasar al nivel superior.",
                    "Mantener el nivel salarial actual.",
                    "Pasar al nivel salarial inmediato inferior.",
                  ],
                  fontSize: 11,
                  margin: [10, 0, 0, 10],
                  border: [true, false, false, true],
                },
                {
                  border: [false, false, true, true],
                  type: "circle",
                  ul: [
                    "Analizar para proceder a la ratificación o devolución de la categoría docente.",
                    "Dar por terminada la relación laboral.",
                    "Dar por terminado el contrato determinado o convenio como profesor a tiempo parcial.",
                  ],
                  fontSize: 11,
                  margin: [0, 0, 0, 10],
                },
              ],
              /* [
                {
                  text: "cc",
                  border: [false, true, true, false],
                },
                {
                  text: "dd",
                  border: [false, false, true, true],
                },
              ],
              [
                {
                  text: "ee ",

                  border: [true, true, true, true],
                },
                {
                  border: [true, true, true, true],

                  text: " ff",
                },
              ], */
            ],
          },
          layout: {
            defaultBorder: false,
          },
        },

        {
          text: "Motivos de la no Evaluación",
          style: "header",

          bold: true,
          margin: [0, 30, 0, 10],
        },

        {
          style: "tableExample",
          table: {
            widths: ["*", "*"],

            body: [
              [
                {
                  text: "Marque con una (X)",
                  italics: true,
                  fontSize: 10,

                  border: [true, true, false, false],
                },
                {
                  border: [false, true, true, false],

                  text: "",
                },
              ],
              [
                {
                  type: "circle",
                  ul: [
                    "Enfermedad.",
                    "Licencia sin sueldo y maternidad.",
                    "Otra causa. Especificar.",
                  ],
                  fontSize: 11,
                  margin: [10, 0, 0, 10],
                  border: [true, false, false, true],
                },
                {
                  border: [false, false, true, true],
                  table: {
                    widths: ["*"],
                    heights: [50],
                    body: [[{ text: "" }]],
                  },
                  margin: [0, 0, 10, 10],
                },
              ],
            ],
          },
          layout: {
            defaultBorder: false,
          },
        },

        {
          style: "tableExample",
          margin: [0, 20, 0, 0],
          table: {
            widths: [370, "*"],
            heights: [50],

            body: [
              [
                {
                  text: "",
                  italics: true,
                  fontSize: 10,

                  border: [false, false, false, false],
                },
                {
                  border: [true, true, true, false],

                  text: "Cuño de la facultad o del área.",
                  fontSize: 8,
                },
              ],
              [
                {
                  text: "",
                  italics: true,
                  fontSize: 10,

                  border: [false, false, false, false],
                },
                {
                  border: [true, false, true, true],
                  fontSize: 10,
                  text: "Firma Decano",
                  alignment: "right",
                },
              ],
            ],
          },
          layout: {
            defaultBorder: false,
          },
        },
      ],
    };

    pdfMake.createPdf(docDefinition).download(namePDF);
    //pdfMake.createPdf(docDefinition).open();
  };

  return {
    generatePDFEvaluation,
    evaluation: computed(() => store.getters["indicator/evaluation"]),
  };
};

export default usePDFEvaluation;
