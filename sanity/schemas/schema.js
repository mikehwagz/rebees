import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Documents
import config from './documents/config'
import home from './documents/home'
import projects from './documents/projects'
import project from './documents/project'
import category from './documents/category'
import location from './documents/location'
import person from './documents/person'
import people from './documents/people'
import opportunities from './documents/opportunities'
import careers from './documents/careers'
import career from './documents/career'
import tenants from './documents/tenants'
import partners from './documents/partners'

// Objects
import imageWithAltText from './objects/imageWithAltText'
import imageWithAltTextAndCaption from './objects/imageWithAltTextAndCaption'
import richText from './objects/richText'
import cta from './objects/cta'
import typeformLink from './objects/typeformLink'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    config,
    home,
    projects,
    project,
    category,
    location,
    person,
    people,
    opportunities,
    careers,
    career,
    tenants,
    partners,
    imageWithAltText,
    imageWithAltTextAndCaption,
    richText,
    cta,
    typeformLink,
  ]),
})
