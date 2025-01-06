function Footer() {
  return (
    <footer className="custom-footer bg-light py-6">
      <div className="container text-center">
        {/* Contact Info */}
        <div className="row">
          <div className="col-md-4">
            <i className="fas fa-phone"></i> Τηλέφωνο: 210325880 - 2103258090
          </div>
          <div className="col-md-4">
            <i className="fas fa-envelope"></i> Email: ntantades@yeka.gr
          </div>
          <div className="col-md-4">
            <i className="fas fa-map-marker-alt"></i> Διεύθυνση: Αθήνα, Ελλάδα
          </div>
        </div>
      </div>

      {/* Center of Footer */}
      <div className="container mid my-6">
        <div className="row">
          <div className="col-md-3 text-center">
            <div className="mt-3 fw-bold">Νταντάδες</div>
            <div className="mt-3">Οδηγίες για νταντάδες</div>
            <div className="mt-3">Γίνε Νταντά</div>
          </div>
          <div className="col-md-3 text-center">
            <div className="mt-3 fw-bold">Γονείς</div>
            <div className="mt-3">Οδηγίες για γονείς</div>
            <div className="mt-3">Βρες Νταντά</div>
          </div>
          <div className="col-md-3 text-center">
            <div className="mt-3 fw-bold">Πληροφορίες</div>
            <div className="mt-3">Ανακοινώσεις</div>
            <div className="mt-3">Οδηγίες για νταντάδες</div>
            <div className="mt-3">Οδηγίες για γονείς</div>
          </div>
          <div className="col-md-3 text-center">
            <div className="mt-3 fw-bold">Βοήθεια</div>
            <div className="mt-3">Συχνές ερωτήσεις</div>
            <div className="mt-3">Sitemap</div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="container bot text-center mt-3">
        <p>© 2024 Powered by Gov.gr</p>
      </div>
    </footer>
  );
}

export default Footer;