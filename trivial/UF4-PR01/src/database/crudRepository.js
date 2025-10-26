//CRUD CON ESTRUCTURAS DE RETORNO SOLO DE MODELO

export const create = async (model, data) => {
    const doc = new model(data);
    return await doc.save();
  };
  
  export const findAll = async (model, filter = {}) => {
    return await model.find(filter);
  };
  
  export const findById = async (model, id) => {
    return await model.findById(id);
  };
  
  export const updateById = async (model, id, data) => {
    return await model.findByIdAndUpdate(id, data, { new: true });
  };
  
  export const deleteById = async (model, id) => {
    return await model.findByIdAndDelete(id);
  };
  