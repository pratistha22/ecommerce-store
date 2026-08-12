function Footer() {
  return (
    <footer style={{
      backgroundColor: "#e75480",
      color: "white",
      textAlign: "center",
      padding: "24px",
      marginTop: "60px",
    }}>
      <p style={{ marginBottom: "8px", fontWeight: "bold" }}>💌 Get in touch</p>
      <p style={{ fontSize: "14px" }}>WhatsApp: +977 9811073733 &nbsp;|&nbsp; Instagram: @Mystore</p>
      <p style={{ fontSize: "12px", marginTop: "12px", opacity: 0.8 }}>
        © {new Date().getFullYear()} MyStore. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;