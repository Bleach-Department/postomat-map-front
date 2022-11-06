import { FC, useEffect } from "react";
import { Page, Document, StyleSheet, Text, Image } from "@react-pdf/renderer";

type Props = {
  imageSrc: string;
};

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  image: {
    width: "100%",
  },
});

const PdfReport: FC<Props> = ({ imageSrc }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>PDF Report</Text>
        <Image style={styles.image} source={imageSrc} />
      </Page>
    </Document>
  );
};

export default PdfReport;
