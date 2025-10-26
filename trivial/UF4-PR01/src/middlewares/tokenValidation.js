import jwt from 'jsonwebtoken';

// MIDDLEWARE PARA VALIDAR TOKEN, USUARIOS LOGUEADOS
export const validate = (req, res, next) => {
  const bearerHeader = req.headers.authorization;

  if (bearerHeader && bearerHeader.startsWith('Bearer ')) {
    const token = bearerHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;
      return next();
    } catch (error) {
      console.log('Invalid Token', error);
      return res.status(400).json({ status: 400, message: 'ERROR - Invalid token' });
    }
  } else {
    console.log('ERROR Missing token');
    return res.status(400).json({ status: 400, message: 'Bearer token missing from header' });
  }
};

// MIDDLEWARE PARA USUARIOS NO LOGUEADOS
export const publicFetch = (req, _res, next) => {
  const bearerHeader = req.headers.authorization;

  if (bearerHeader && bearerHeader.startsWith('Bearer ')) {
    const token = bearerHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;
    } catch (error) {
      console.log('TOKEN - Not needed');
    }
  }

  next();
};
