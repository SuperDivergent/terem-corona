import React, { Component } from "react";

class AppNavbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/">
          טרם קורונה
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-item nav-link active" href="/">
              Home <span className="sr-only">(current)</span>
            </a>
            <a className="nav-item nav-link" href="/">
              Features
            </a>
            <a className="nav-item nav-link" href="/">
              Pricing
            </a>
            <a className="nav-item nav-link disabled" href="/">
              Disabled
            </a>
          </div>
        </div>
      </nav>
    );
  }
}

export default AppNavbar;

{
  /* <Navbar bg="dark" variant="dark" expand="lg" classNameName="mb-4">
<Navbar.Brand as={Link} to="/">
  Terem Corona
</Navbar.Brand>
<Navbar.Toggle aria-controls="basic-navbar-nav" />
<Navbar.Collapse id="basic-navbar-nav">
  <Nav classNameName="mr-auto">
    <Nav.Link as={Link} to="/logistics">
      Order Management
    </Nav.Link>
    <Nav.Link as={Link} to="/inventory">
      Inventory
    </Nav.Link>
    <Nav.Link as={Link} to="/recipts">
      Recipts
    </Nav.Link>
    <NavDropdown title="Actions">
      <NavDropdown.Item as={Link} to="/placeOrder">
        Place Order
      </NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/exportExcel">
        Export Excel
      </NavDropdown.Item>
    </NavDropdown>
  </Nav>
</Navbar.Collapse>
</Navbar> */
}
