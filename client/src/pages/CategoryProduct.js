import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const CategoryProduct = () => {
  const params = useParams();
  const [products,setProducts] = useState([])
  const [category, setCategory] = useState([])
  const navigate = useNavigate()


    useEffect(() => {
        if (params?.slug) getProductsByCat()
    }, [params?.slug])


  const getProductsByCat = async () => {
    try{
        const { data } = await axios.get(
            `/api/v1/product/product-category/${params.slug}`
        );
        setProducts(data?.products);
        setCategory(data?.category);
    } catch (error) {
        console.log(error)
    }
  }

   
  return (
    <Layout>
       <div className='container mt-3'>
        <h4 className='text-center'>{category?.name} categories related products</h4>
        <h5 className='text-center'>{products?.length} result found</h5>
        <div className='row'>
                  <div className='col-md-9'>
                      <div className='d-flex flex-wrap'>
                          {products?.map((p) => (
                              <div className="card mx-2 my-2 p-1" style={{ width: "18rem" }} >
                                  <img src={`/api/v1/product/product-photo/${p?._id}`}
                                      className="card-img-top " alt={p.name}
                                      style={{ height: "220px", borderRadius: "20px" }} />
                                  <div className="card-body">
                                      <h5 className="card-title">{p.name}</h5>
                                      <p className="card-text">{p.description.substring(0, 30)}...</p>
                                      <p className='card-text'> $ {p.price}</p>
                                      <button className='btn btn-primary ms-1' onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                      <button className='btn btn-secondary ms-1'>Add To Cart</button>
                                  </div>
                              </div>
                          ))}
                      </div>
                      {/* <div className='m-2 p-3'>
                          {products && products.length < total && (
                              <button
                                  className='btn btn-warning'
                                  onClick={(e) => {
                                      e.preventDefault();
                                      setPage(page + 1);
                                  }}
                              >
                                  {loading ? "Loading ..." : "Loadmore"}
                              </button>
                          )}
                      </div> */}
                  </div>
        </div>
       </div>
    </Layout>
  )
}

export default CategoryProduct