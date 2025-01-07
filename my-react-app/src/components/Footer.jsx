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
            <a href ="/NannyInfo" className="mt-3">Οδηγίες για νταντάδες</a>
            <div className="mt-3">Γίνε Νταντά</div>
          </div>
          <div className="col-md-3 text-center">
            <div className="mt-3 fw-bold">Γονείς</div>
            <a href = "/ParentInfo" className="mt-3">Οδηγίες για γονείς</a>
            <div className="mt-3">Βρες Νταντά</div>
          </div>
          <div className="col-md-3 text-center">
            <div className="mt-3 fw-bold">Πληροφορίες</div>
            <div className="mt-3">Ανακοινώσεις</div>
            <a href = "/NannyInfo" className="mt-3">Οδηγίες για νταντάδες</a>
            {/*added div to go bellow*/}
            <div>
              <a href = "/ParentInfo" className="mt-3">Οδηγίες για γονείς</a>
            </div>
          </div>
          <div className="col-md-3 text-center">
            <div className="mt-3 fw-bold">Βοήθεια</div>
            <a href = "/Faq" className="mt-3">Συχνές ερωτήσεις</a>
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