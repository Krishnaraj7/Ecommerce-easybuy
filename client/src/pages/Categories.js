import React from 'react'
import Layout from '../components/Layout/Layout'
import useCategory from '../hooks/useCategory'

const Categories = () => {
    const categories = useCategory()
  return (
    <Layout title={'All Categories'}>
        <h3>All Categories</h3>
        </Layout>
  )
}

export default Categories