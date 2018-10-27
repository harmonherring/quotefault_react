import React, {Component} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  Dropdown,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

class Quotefault_Navbar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container">
            <NavbarBrand href="/">Quotefault</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>

              <Nav className="ml-auto" navbar>
                <NavItem>
                  <UncontrolledDropdown nav inNavbar>
                    <div className="navbar-user">
                      <DropdownToggle nav caret>
                          <img src="https://profiles.csh.rit.edu/image/test" title="" />
                          Test Bitch
                      </DropdownToggle>
                    </div>
                    <DropdownMenu right>
                      <DropdownItem href="#">
                        Profile
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem href="#">
                        Logout
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
      </div>
    );
  }
}

export default Quotefault_Navbar;
