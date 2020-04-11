import { gql } from 'apollo-boost'

export const SEARCH_QUERY = gql`
	query ($query: String!) {
	  search(query: $query, type: REPOSITORY, first: 20) {
	    repositoryCount
	    nodes {
	      ... on Repository {
	        id
	        databaseId
	        name
	        description
	        nameWithOwner
	        projectsUrl
	        createdAt
	        updatedAt
	        forkCount
	        isFork
	        isDisabled
	        isLocked
	        isMirror
	        isPrivate
	        isTemplate
	        isArchived
	        url
	        hasIssuesEnabled
          stargazers {
            totalCount
	        }
	        forks {
	          totalCount
	          totalDiskUsage
	        }
          primaryLanguage {
	          name
	          id
	          color
	        }
	        licenseInfo {
	          nickname
	          name
	          id
	          body
	          key
	        }
	      }
	    }
	  }
	}
`
