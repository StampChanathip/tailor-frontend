import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import {
  Content,
  ContentCanvas,
  TDocumentDefinitions,
} from "pdfmake/interfaces";
import Moment from "moment";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const exportResumePDF = (data: ResumeFormData) => {
  const { personal, education, experience, activity } = data;
  const tel = personal.telephone;

  const fontSize = { sm: 12, md: 14, lg: 18 };
  const rowSpacing = 5;

  const breakLine: ContentCanvas = {
    canvas: [
      {
        type: "line",
        x1: 0,
        y1: 0,
        x2: 500,
        y2: 0,
        lineWidth: 2,
      },
    ],
    margin: [0, rowSpacing],
  };

  const personalContent: Content = [
    {
      text: `${personal.name} ${personal.surname}`,
      fontSize: fontSize.lg,
      bold: true,
    },
    {
      columns: [
        {
          text: `Email: ${personal.email}`,
          fontSize: fontSize.sm,
        },
        {
          text: `Tel: ${tel.slice(0, 3) + "-" + tel.slice(3, tel.length)}`,
          fontSize: fontSize.sm,
        },
      ],
      margin: [0, rowSpacing + 5, 0, rowSpacing],
    },
    {
      text: `${personal.city}, ${personal.country}`,
      fontSize: fontSize.sm,
      margin: [0, rowSpacing],
    },
    {
      text: ["Personal Profile\n"],
      fontSize: fontSize.md,
      margin: [0, rowSpacing, 0, 0],
      bold: true,
    },
    breakLine,
    {
      text: `${personal.personalProfile}`,
      fontSize: fontSize.sm,
      margin: [0, rowSpacing],
      alignment: "justify",
    },
  ];

  const educationContent: Content = [
    {
      text: ["Education\n"],
      fontSize: fontSize.md,
      margin: [0, rowSpacing, 0, 0],
      bold: true,
    },
    {
      ul: education.map((item) => {
        return [
          {
            stack: [
              {
                text: `${item.fieldOfStudy}`,
                fontSize: fontSize.sm,
                margin: [0, 5, 0, 0],
                bold: true,
              },
              {
                text: `${item.school} (${Moment(item.startDate).format(
                  "Do MMMM YYYY"
                )} - ${Moment(item.endDate).format("Do MMMM YYYY")})`,
                fontSize: fontSize.sm,
                margin: [0, 2, 0, 0],
                bold: true,
              },
              {
                text: `${item.summary}`,
                fontSize: fontSize.sm,
                margin: [0, 5, 0, 0],
                alignment: "justify",
              },
            ],
            unbreakable: true,
          },
        ];
      }),
      type: "none",
      margin: [5, 0, 0, 0],
    },
  ];

  const experienceContent: Content = [
    {
      text: ["Work Experience\n"],
      fontSize: fontSize.md,
      margin: [0, rowSpacing, 0, 0],
      bold: true,
    },
    {
      ul: experience.map((item) => {
        return [
          {
            stack: [
              {
                text: `${item.title}`,
                fontSize: fontSize.sm,
                margin: [0, 5, 0, 0],
                bold: true,
              },
              {
                text: `${item.company} (${Moment(item.startDate).format(
                  "Do MMMM YYYY"
                )} - ${Moment(item.endDate).format("Do MMMM YYYY")})`,
                fontSize: fontSize.sm,
                margin: [0, 2, 0, 0],
                bold: true,
              },
              {
                text: `${item.summary}`,
                fontSize: fontSize.sm,
                margin: [0, 5, 0, 0],
                alignment: "justify",
              },
            ],
            unbreakable: true,
          },
        ];
      }),
      type: "none",
      margin: [5, 0, 0, 0],
    },
  ];
  const activityContent: Content = [
    {
      text: ["Extra Curriculum Activities\n"],
      fontSize: fontSize.md,
      margin: [0, rowSpacing, 0, 0],
      bold: true,
    },
    {
      ul: activity.map((item) => {
        return [
          {
            stack: [
              {
                text: `${item.organization}`,
                fontSize: fontSize.sm,
                margin: [0, 5, 0, 0],
                bold: true,
              },
              {
                text: `${item.role} (${Moment(item.startDate).format(
                  "Do MMMM YYYY"
                )} - ${Moment(item.endDate).format("Do MMMM YYYY")})`,
                fontSize: fontSize.sm,
                margin: [0, 2, 0, 0],
                bold: true,
              },
              {
                text: `${item.summary}`,
                fontSize: fontSize.sm,
                margin: [0, 5, 0, 0],
                alignment: "justify",
              },
            ],
            unbreakable: true,
          },
        ];
      }),
      type: "none",
      margin: [5, 0, 0, 0],
    },
  ];

  const docDefinition: TDocumentDefinitions = {
    pageSize: "A4",
    content: [
      ...personalContent,
      ...educationContent,
      { text: "", margin: [0, rowSpacing] },
      ...experienceContent,
      { text: "", margin: [0, rowSpacing] },
      ...activityContent,
    ],
  };

  pdfMake.createPdf(docDefinition).open();
};

export default exportResumePDF;
