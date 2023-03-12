import { Schema, model, connect } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface Usuario {
  name: string;
  email: string;
  dinero: number;
}

interface Producto {
  name: string;
  precio: number;
}


// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<Usuario>({
  name: { type: String, required: true, unique: true},
  email: { type: String, required: true },
  dinero : {type: Number, required: true}
});

const productSchema = new Schema<Producto>({
  name: { type: String, required: true, unique: true },
  precio : {type: Number, required: true}
});

// 3. Create a Model.
const User = model<Usuario>('User', userSchema);
const Product = model<Producto>('Producto', productSchema);

run().catch(err => console.log(err));

async function run() {
  // 4. Connect to MongoDB
  await connect('mongodb://127.0.0.1:27017/test');


  /*-----------------------------CREATE-------------------*/
  const user1 = new User({
    name: 'Pau',
    email: 'pau@garcia.com',
    dinero: 0.01
  });
  await user1.save();

  console.log("Se ha creado un nuevo usuario con mail -> " + user1.email); // 'pau@garcia.com'
  
  const user2 = new User({
    name: "Rodrigo",
    email: "rodrigo@gmail.com",
    dinero: 0.02
  });
  await user2.save();

  console.log("Se ha creado un nuevo usuario con mail -> " + user2.email); // 'rodrigo@gmail.com'

  const user3 = new User({
    name: "Marta",
    email: "marta@gmail.com",
    dinero: 3
  });
  await user3.save();

  console.log("Se ha creado un nuevo usuario con mail -> " + user3.email); //marta@gmail.com


  const product1 = new Product({
    name: "Patatas",
    precio: 3
  })
  await product1.save();

  console.log("Se ha creado un nuevo producto con nombre -> " + product1.name);



  const product2 = new Product({
    name: "Zanahorias",
    precio: 100
  })
  await product2.save();

  console.log("Se ha creado un nuevo producto con nombre -> " + product2.name);




  const product3 = new Product({
    name: "Queso",
    precio: 5
  })
  await product3.save();

  console.log("Se ha creado un nuevo producto con nombre -> " + product3.name);



  /*-----------FIND---------------*/
  const usuarios = await User.find()
  console.log("Printeo todos los usuarios de mi BBDD")
  console.log(usuarios)


  const productos = await Product.find()
  console.log("Printeo todos los usuarios de mi BBDD")
  console.log(productos)


/*-----------------DELETE----------------*/
  const deleteUser = await User.deleteOne({name: "Rodrigo"});
  console.log("Elimino a Rodrigo");


  const deleteProduct = await Product.deleteOne({name: "Queso"});
  console.log("Elimino el queso");


  /*----------- FIND - V2 ---------------*/
  const usuarios2 = await User.find()
  console.log("Printeo los usuarios restantes de mi BBDD")
  console.log(usuarios2)


  const productos2 = await Product.find()
  console.log("Printeo los productos restantes de mi BBDD")
  console.log(productos2)

  /* -------------------UPDATE------------ */

  const user = await User.findOneAndUpdate({name: 'Pau'}, {
    name: 'Pablo'
  }, {new: true});
  console.log("Actualizo a Pau")
  console.log(user);


  const prod = await Product.findOneAndUpdate({name: 'Patatas'}, {
    precio: 4
  }, {new: true});
  console.log("Actualizo el precio de la patata")
  console.log(prod);


  /*----------- FIND - V2 ---------------*/
  const usuarios3 = await User.find()
  console.log("Printeo la BBDD actualizada")
  console.log(usuarios3)


  const productos3 = await Product.find()
  console.log("Printeo la BBDD actualizada")
  console.log(productos3)



}
  
