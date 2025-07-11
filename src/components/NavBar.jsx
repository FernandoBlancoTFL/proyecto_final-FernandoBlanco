import { useRef, useState, useEffect } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { ShoppingCart } from './ShoppingCart'
import { LoginButton } from './LoginButton'
import { Link, useLocation } from 'react-router-dom'
import { SearchBar } from './SearchBar'

export function NavBar ({ handleFilter }) {
  const searchRef = useRef()
  const navRef = useRef()
  const location = useLocation()
  const [expanded, setExpanded] = useState(false)

  const handleSearch = (query) => {
    if (!query.trim()) {
      handleFilter('https://dummyjson.com/products', 'Nuestros Productos')
    } else {
      handleFilter(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`, `Resultados para "${query}"`)
    }
  }

  const handleCategoryClick = (url, name) => {
    handleFilter(url, name)
    if (searchRef.current) {
      searchRef.current.clear()
    }
    setExpanded(false)
  }

  const closeMenu = () => setExpanded(false)

  const shouldShowCart = location.pathname === '/' || location.pathname.startsWith('/product/')
  const shouldShowLoginButton = location.pathname !== '/login'

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target)
      ) {
        setExpanded(false)
      }
    }

    if (expanded) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [expanded])

  return (
    <Navbar
      ref={navRef}
      expand='lg'
      expanded={expanded}
      onToggle={setExpanded}
      className='bg-dark py-3 shadow custom-navbar'
      variant='dark'
    >
      <Container className='d-flex justify-content-between align-content-center'>
        <Navbar.Brand as={Link} to='/' onClick={closeMenu} className='m-0 mx-lg-2 d-flex flex-grow-1 flex-lg-grow-0 align-items-center'>
          <img
            src='https://cdn-icons-png.freepik.com/512/869/869636.png?ga=GA1.1.1678774421.1729989836https://www.freepik.es/iconos/tienda'
            alt='Shopnetic Logo'
            width='50'
            height='50'
            className='d-inline-block align-middle'
          />
          <h3 className='m-0 mx-2 d-none d-xl-block' style={{ fontFamily: 'Poppins, sans-serif' }}>Shopnetic</h3>
        </Navbar.Brand>

        <div className='d-flex align-items-center gap-1'>
          {shouldShowCart && <ShoppingCart isPositionFixed={false} />}
          {shouldShowLoginButton && <LoginButton isMobile />}
        </div>

        <Navbar.Toggle aria-controls='basic-navbar-nav' style={{ marginLeft: '12px' }} />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link
              as={Link}
              to='/'
              onClick={() => handleCategoryClick('https://dummyjson.com/products', 'Nuestros Productos')}
              className={location.pathname === '/' ? 'text-primary fw-bold' : 'text-white'}
            >
              Inicio
            </Nav.Link>

            <Nav.Link
              as={Link}
              to='/contact'
              onClick={closeMenu}
              className={location.pathname === '/contact' ? 'text-primary fw-bold' : 'text-white'}
            >
              Contacto
            </Nav.Link>

            <Nav.Link
              as={Link}
              to='/about'
              onClick={closeMenu}
              className={location.pathname === '/about' ? 'text-primary fw-bold' : 'text-white'}
            >
              Sobre Nosotros
            </Nav.Link>

          </Nav>
          <div className='searchBar-mobile d-flex align-items-center justify-content-center my-1 me-3 search-input'>
            <SearchBar onSearch={handleSearch} ref={searchRef} />
          </div>
        </Navbar.Collapse>
        {shouldShowLoginButton && <LoginButton isMobile={false} />}
      </Container>
    </Navbar>
  )
}
