import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'

function EntryTemplate(props) {

  const entry = props.data.markdownRemark
  const { previous, next } = props.pageContext
  const { date, publish, title } = entry.frontmatter

  return (
    <Layout location={props.location} title={'test'}>

      <h1>{title}</h1>
      <p
        style={{

          display: `block`,
        }}
      >
        {publish ? publish : date}
      </p>
      <div dangerouslySetInnerHTML={{ __html: entry.html }} />



      <ul
        style={{
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          listStyle: `none`,
          padding: 0,
        }}
      >
        <li>
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              &lArr; {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} &rArr;
            </Link>
          )}
        </li>
      </ul>
    </Layout>
  )
}

export default EntryTemplate

export const pageQuery = graphql`
  query EntryBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        publish(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
