
function Footer() {
  return (
    <footer className="bg-light text-center text-lg-start mt-auto">
      <div className="container p-3">
        <div className="row">
          <div className="col-md-6 text-md-start">
            <p className="mb-0">&copy; {new Date().getFullYear()} StoreOne. All Rights Reserved.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <a href="/privacy" className="text-decoration-none me-3">Privacy Policy</a>
            <a href="/terms" className="text-decoration-none">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
