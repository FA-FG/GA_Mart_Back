// backend/db/seedProduct.js
const mongoose = require('mongoose');
const {Product} = require("../models") // Make sure the path is correct
require('dotenv').config()

// Connect to MongoDB


mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');

    // Check if products already exist in the collection
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log('Inserting fake products into the database...');
      // Insert products from fakeDatabase
      // await Product.insertMany(fakeDatabase);
      await Product.insertMany([{

        name: 'Apple',
        quantity: 10,
        unit: 'kg',
        price: 3.5,
        image:'https://www.luluhypermarket.com/cdn-cgi/image/f=auto/medias/19047-01.jpg-1200Wx1200H?context=bWFzdGVyfGltYWdlc3wyODA0NjR8aW1hZ2UvanBlZ3xhR1pqTDJnMll5OHhNRFV5TlRnME1UTTFPRGczT0M4eE9UQTBOeTB3TVM1cWNHZGZNVEl3TUZkNE1USXdNRWd8MTc3NjE3ZGVhYmY5Y2I0ODU5MTczNTNkZmFjYjdhMmE2YzYzOTczN2JiMjBiODViNTQ5MjA3MmU3YjI1NWE4YQ',
        description: 'Fresh, crispy apples, perfect for snacking or baking.'
      },
      {

        name: 'Banana', 
        quantity: 20,
        unit: 'kg',
        price: 1.2,
        image:'https://storage.kun.uz/source/thumbnails/_medium/9/D8EWICfyOkUgf1ccvwhYNXTi_n59FXof_medium.jpg',
        description: 'Sweet and nutritious bananas for a healthy snack.'
      },
      {

        name: 'Carrot',
        quantity: 15,
        unit: 'kg',
        price: 2.8,
        image:
          'https://5.imimg.com/data5/SELLER/Default/2023/3/WB/RV/ZG/137288736/12818-1-500x500.webp',
        description: 'Organic carrots full of vitamins and flavor.'
      },
      {
 
        name: 'Tomato',
        quantity: 25,
        unit: 'kg',
        price: 3.0,
        image:
          'https://www.heddensofwoodtown.co.uk/wp-content/uploads/2020/05/tomatoes_opt.jpg',
        description: 'Juicy tomatoes, ideal for cooking and salads.'
      },
      {

        name: 'Potato',
        quantity: 30,
        unit: 'kg',
        price: 1.5,
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpnj6BRx2QdzpTXmb30SZvMK7ORfO43FsUlw&s',
        description: 'Delicious and versatile potatoes for any meal.'
      },
      {

        name: 'Onion',
        quantity: 40,
        unit: 'kg',
        price: 2.2,
        image:
          'https://produits.bienmanger.com/36700-0w470h470_Organic_Red_Onion_From_Italy.jpg',
        description: 'Fresh onions to enhance the flavor of your dishes.'
      },
      {

        name: 'Lemon',
        quantity: 50,
        unit: 'kg',
        price: 4.0,
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiuWLC67CB8Ju6v2iplRx42_l_YMHws23ebA&s',
        description: 'Tart and juicy lemons, perfect for drinks and desserts.'
      },
      {
        name: 'Grapes',
        quantity: 12,
        unit: 'kg',
        price: 5.0,
        image:
          'https://www.aicr.org/wp-content/uploads/2020/01/shutterstock_533487490-640x462.jpg.webp',
        description: 'Sweet grapes for a refreshing snack or juice.'
      },
      {
    
        name: 'Strawberry',
        quantity: 18,
        unit: 'kg',
        price: 6.0,
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOC_tA0i3qAK91qTRdlqJ9-HbpPppIxII70Q&s',
        description: 'Juicy, ripe strawberries perfect for smoothies and desserts.'
      },
      {
    
        name: 'Watermelon',
        quantity: 22,
        unit: 'kg',
        price: 3.5,
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaFt6Iz3D590bKd1YDJROFYTQz_H57VLft_Q&s',
        description: 'Refreshing watermelon for hot summer days.'
      },
      {
      
        name: 'Spinach',
        quantity: 30,
        unit: 'kg',
        price: 4.5,
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDr6TxSU65t995cB7IJqr5f-OW2rD9XBdLyA&s',
        description: 'Fresh spinach, rich in vitamins and minerals.'
      },
      {
    
        name: 'Peach',
        quantity: 12,
        unit: 'kg',
        price: 5.5,
        image:
          'https://s30386.pcdn.co/wp-content/uploads/2019/08/clip-Peaches_HNL1408_ts462290863.jpg',
        description: 'Sweet and juicy peaches, perfect for desserts.'
      },
      {
     
        name: 'Cucumber',
        quantity: 18,
        unit: 'kg',
        price: 2.0,
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT19UUTLodCwKT1sEjgfdbWn8WLfiJ3D2d4Q&s',
        description: 'Crisp cucumbers for refreshing salads and snacks.'
      },
      {
  
        name: 'Avocado',
        quantity: 8,
        unit: 'kg',
        price: 7.0,
        image:
          'https://cdn.britannica.com/72/170772-050-D52BF8C2/Avocado-fruits.jpg',
        description: 'Creamy avocados perfect for toast, guacamole, or salads.'
      },
      {
     
        name: 'Pineapple',
        quantity: 15,
        unit: 'kg',
        price: 4.5,
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTapAbdRPEJp_72gUSBSGmVgu1Yu08QbcQzwg&s',
        description: 'Sweet and tangy pineapples for a tropical treat.'
      },
      {
        name: 'Mango',
        quantity: 12,
        unit: 'kg',
        price: 5.2,
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFFO_itt5Yux9xPi58A5omfQvETfFhm5ub1Q&s',
        description: 'Exotic and sweet mangoes, ideal for smoothies and desserts.'
      },
      {

        name: 'Blueberry',
        quantity: 20,
        unit: 'kg',
        price: 6.5,
        image:
          'https://www.luluhypermarket.com/cdn-cgi/image/f=auto/medias/1287653-01.jpg-1200Wx1200H?context=bWFzdGVyfGltYWdlc3wyMjQ3OTl8aW1hZ2UvanBlZ3xhRGxqTDJnMU5DODVOemc0TlRJME1UQXhOall5THpFeU9EYzJOVE10TURFdWFuQm5YekV5TURCWGVERXlNREJJfDFiNDRmZGFkMmE2YzkyZGJiMDZkMjY3MTEzNWEwYTYyMDViOTYxY2JmMzBlMmY3NGFjNjE1YjgzZmQyZmYyODM',
        description: 'Fresh blueberries, rich in antioxidants and flavor.'
      },
      {
 
        name: 'Chili Pepper',
        quantity: 30,
        unit: 'kg',
        price: 2.5,
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSIYIK_oDwi_JwoihHDV4gbq-ogtSzihdEoQ&s',
        description: 'Spicy chili peppers to add heat to your meals.'
      },
      {
  
        name: 'Cabbage',
        quantity: 18,
        unit: 'kg',
        price: 1.8,
        image:
          'https://d3awvtnmmsvyot.cloudfront.net/api/file/GGosbWO9SYyGxvDaciZf/convert?fit=max&w=570&cache=true',
        description: 'Fresh cabbage for salads and stir-fries.'
      },
      {
  
        name: 'Garlic',
        quantity: 22,
        unit: 'kg',
        price: 3.0,
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpaAlfz2LZmnN6dPP_9hYIFr-dYw4-Yx618Q&s',
        description: 'Flavorful garlic to add zest to any dish.'
      },
      {

        name: 'Zucchini',
        quantity: 20,
        unit: 'kg',
        price: 2.7,
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNZ2hJYtaYVZYq1AdkzdUAK3kPZ8hUjFkz7A&s',
        description: 'Tender zucchinis perfect for grilling or stir-frying.'
      },
      {

        name: 'Bell Pepper',
        quantity: 10,
        unit: 'kg',
        price: 4.0,
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxWdlKgytO_diyJkMxhaphD_xcJmLzNwhjGg&s',
        description:
          'Vibrant bell peppers for adding color and taste to your meals.'
      },
      {

        name: 'Pumpkin',
        quantity: 12,
        unit: 'kg',
        price: 5.0,
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1FFO2MrZfZR9JvFeX4v8OkKF4bNEE9mXPCg&s',
        description: 'Sweet pumpkins for pies, soups, and roasts.'
      },
      {
    
        name: 'Lettuce',
        quantity: 25,
        unit: 'kg',
        price: 3.2,
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQkym2BFCtpK1etDMciFrYw8gwx9W-bI_aBA&s',
        description: 'Fresh lettuce, ideal for salads and sandwiches.'
      },
      {
    
        name: 'Kale',
        quantity: 14,
        unit: 'kg',
        price: 6.5,
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQWxCRLOlvgZhKrnjlSuAmPXL4ek65Zvm-rA&s',
        description: 'Nutrient-rich kale for salads or sautéing.'
      },
      {
   
        name: 'Chard',
        quantity: 17,
        unit: 'kg',
        price: 4.0,
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV9XvH_UN1l-1DauIgaN_lNwWpYDH7KsDmYw&s',
        description: 'Colorful Swiss chard, perfect for healthy cooking.'
      },
      {
     
        name: 'Broccoli',
        quantity: 25,
        unit: 'kg',
        price: 2.9,
        image:
          'https://paddocktopantry.co.nz/cdn/shop/products/23_900x.jpg?v=1693346284',
        description: 'Fresh broccoli for healthy, nutritious meals.'
      },
      {
      
        name: 'Eggplant',
        quantity: 15,
        unit: 'kg',
        price: 3.3,
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZhW_V2S407O0tr-JoVFZdVX-hnObQ363yjg&s',
        description: 'Tender eggplants, ideal for grilling or stews.'
      },
      {
     
        name: 'Asparagus',
        quantity: 12,
        unit: 'kg',
        price: 7.0,
        image:
          'https://img.freepik.com/premium-photo/fresh-green-asparagus-white-background_146936-859.jpg',
        description: 'Delicate asparagus for grilling, roasting, or sautéing.'
      },
      {
     
        name: 'Radish',
        quantity: 10,
        unit: 'kg',
        price: 2.5,
        image:
          'https://img.freepik.com/premium-photo/freshly-ripe-radishes-isolated-white-background_33736-2493.jpg',
        description: 'Crisp, spicy radishes for salads or snacks.'
      },
      {
      
        name: 'Artichoke',
        quantity: 8,
        unit: 'kg',
        price: 6.0,
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT47xdrEuZpCzEP8KhPnhreFz8ItJ8YDOus8g&s',
        description: 'Tender artichokes, perfect for steaming or grilling.'
      }]);
      console.log('Fake products inserted successfully!');
    } else {
      console.log('Products already exist in the database.');
    }

    // Disconnect from MongoDB
    mongoose.disconnect();
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
