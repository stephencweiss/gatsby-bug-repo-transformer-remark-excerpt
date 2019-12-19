import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import getBlurb from "../utils/getBlurb"

const SecondPage = props => {
  const { data } = props
  const posts = data.allMarkdownRemark.edges.sort()
  return (
    <Layout>
      <SEO title="Page two" />
      <h1>This page uses MARKDOWN excerpts</h1>
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

      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export default SecondPage

export const pageQuery = graphql`
  query indexBlogQuery {
    allMarkdownRemark {
      edges {
        node {
          excerpt(format: MARKDOWN)
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
