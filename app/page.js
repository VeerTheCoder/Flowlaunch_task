"use client"
import ProductList from '../components/ProductList';

export default function Home() {
  return (
    <div>
  
      <main className="py-10">
        <h1 className="text-3xl font-bold text-center mb-5 text-gray-800 underline underline-offset-8">Product Listing Page</h1>
        <h2 className="text-2xl text-center mb-5 text-gray-800">Choose whatever you want</h2>
        <ProductList />
      </main>
    </div>
  );
}
