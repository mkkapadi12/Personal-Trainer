import React from 'react';
import { Link } from 'react-router-dom';

const collectionData = [
  {
    id: 1,
    name: 'cross trainer',
    category: 'cross trainer',
    image:
      'https://personaltrainer-workdo.myshopify.com/cdn/shop/collections/image_84.png?v=1689141011',
  },
  {
    id: 2,
    name: 'gym equipment',
    category: 'gym equipment',
    image:
      'https://personaltrainer-workdo.myshopify.com/cdn/shop/collections/image_85.png?v=1689144560',
  },
  {
    id: 3,
    name: 'protien poweder',
    category: 'protien poweder',
    image:
      'https://personaltrainer-workdo.myshopify.com/cdn/shop/collections/image_86.png?v=1689152015',
  },
  {
    id: 4,
    name: 'tredmills',
    category: 'tredmills',
    image:
      'https://personaltrainer-workdo.myshopify.com/cdn/shop/collections/image_87.png?v=1689157536',
  },
];

const Collections = () => {
  return (
    <div>
      <section className="py-10 md:py-20">
        <div className="container mx-auto max-w-292.5 px-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase text-center">
            Collections
          </h1>
          <div className="grid grid-cols-1 gap-5 mt-5 md:grid-cols-2 lg:grid-cols-3">
            {collectionData.map((collection) => (
              <div key={collection.id} className="flex flex-col gap-2">
                <Link to={`/products/collections/${collection.category}`}>
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="h-full w-full object-cover"
                  />
                </Link>
                <h2 className="text-xl font-bold uppercase text-center">
                  {collection.name}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Collections;
