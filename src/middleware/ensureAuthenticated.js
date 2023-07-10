// Middleware de autenticación
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    // Si el usuario está autenticado, permite el acceso a la ruta
    return next();
  } else {
    // Si el usuario no está autenticado, redirige a la página de inicio de sesión
    req.flash('error_msg', 'Debes iniciar sesión para acceder a esta página');
    res.redirect('/login');
    

  }
}

module.exports = ensureAuthenticated