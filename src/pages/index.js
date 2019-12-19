import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import getBlurb from "../utils/getBlurb"
const IndexPage = props => {
  const { data } = props
  const posts = data.allMarkdownRemark.edges.sort()
  return (
    <Layout>
      <SEO title="Home" />
      <h1>This page uses PLAIN excerpts</h1>
      {posts.map(({ node }) => {
        const { title } = node.frontmatter
        const { slug } = node.fields
        return (
          <div key={slug}>
            <Link to={slug}>{title}</Link>

            {getBlurb({ content: node.excerpt, path: slug })}
          </div>
        )
      })}
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query secondPageQuery {
    allMarkdownRemark {
      edges {
        node {
          excerpt(format: PLAIN)
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
