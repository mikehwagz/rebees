import {defineConfig} from 'sanity'
import {dashboardTool, projectUsersWidget} from '@sanity/dashboard'
import {netlifyWidget} from 'sanity-plugin-dashboard-widget-netlify'
import {structureTool} from 'sanity/structure'
// import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import React from 'react'
import Emoji from 'react-emoji-render'

export default defineConfig({
  name: 'default',
  title: 'Rebees',

  projectId: 'uhabseje',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Home')
              .icon(() => <Emoji style={{fontSize: 20}} text="🏡" />)
              .child(S.editor().id('home').schemaType('home').documentId('homepage')),
            S.listItem()
              .title('Projects Page')
              .icon(() => <Emoji style={{fontSize: 20}} text="✨" />)
              .child(S.editor().id('projects').schemaType('projects').documentId('projectspage')),
            S.listItem()
              .title('People Page')
              .icon(() => <Emoji style={{fontSize: 20}} text="🤠" />)
              .child(S.editor().id('people').schemaType('people').documentId('peoplepage')),
            S.listItem()
              .title('Opportunities Page')
              .icon(() => <Emoji style={{fontSize: 20}} text="📈" />)
              .child(
                S.editor()
                  .id('opportunities')
                  .schemaType('opportunities')
                  .documentId('opportunitiespage'),
              ),
            S.listItem()
              .title('Careers Page')
              .icon(() => <Emoji style={{fontSize: 20}} text="💸" />)
              .child(S.editor().id('Careers').schemaType('careers').documentId('careerspage')),
            S.listItem()
              .title('Tenants Page')
              .icon(() => <Emoji style={{fontSize: 20}} text="🏙️" />)
              .child(S.editor().id('Tenants').schemaType('tenants').documentId('tenantspage')),
            S.listItem()
              .title('Partner Page')
              .icon(() => <Emoji style={{fontSize: 20}} text="🤝" />)
              .child(S.editor().id('Partners').schemaType('partners').documentId('partnerspage')),
            S.listItem()
              .title('Privacy Policy Page')
              .icon(() => <Emoji style={{fontSize: 20}} text="📄" />)
              .child(
                S.editor()
                  .id('privacyPolicy')
                  .schemaType('privacyPolicy')
                  .documentId('privacyPolicypage'),
              ),
            S.listItem()
              .title('Terms and Conditions Page')
              .icon(() => <Emoji style={{fontSize: 20}} text="🗒️" />)
              .child(
                S.editor()
                  .id('termsAndConditions')
                  .schemaType('termsAndConditions')
                  .documentId('termsAndConditionspage'),
              ),
            S.listItem()
              .title('Global Configuration')
              .icon(() => <Emoji style={{fontSize: 20}} text="💕" />)
              .child(S.editor().id('config').schemaType('config').documentId('global-config')),

            S.divider(),

            S.listItem()
              .title('Projects')
              .icon(() => <Emoji style={{fontSize: 20}} text="🎨" />)
              .child(S.documentTypeList('project').title('Projects')),
            S.listItem()
              .title('People')
              .icon(() => <Emoji style={{fontSize: 20}} text="🤸‍" />)
              .child(S.documentTypeList('person').title('People')),
            S.listItem()
              .title('Careers')
              .icon(() => <Emoji style={{fontSize: 20}} text="👩‍💼" />)
              .child(S.documentTypeList('career').title('Careers')),
            S.listItem()
              .title('Tenant Vacancies')
              .icon(() => <Emoji style={{fontSize: 20}} text="🥑" />)
              .child(S.documentTypeList('tenantVacancy').title('Tenant Vacancies')),
            S.listItem()
              .title('Categories')
              .icon(() => <Emoji style={{fontSize: 20}} text="🐱" />)
              .child(S.documentTypeList('category').title('Categories')),
            S.listItem()
              .title('Locations')
              .icon(() => <Emoji style={{fontSize: 20}} text="🌎" />)
              .child(S.documentTypeList('location').title('Locations')),
          ]),
    }),
    dashboardTool({
      widgets: [
        netlifyWidget({
          title: 'Netlify',
          sites: [
            {
              title: 'Website',
              apiId: '9df26ea6-73aa-4c20-9527-e772a0c4e60f',
              buildHookId: '5df8d08f213535018e1b507b',
              name: 'rebees',
            },
          ],
        }),
        projectUsersWidget(),
      ],
    }),
    // visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  scheduledPublishing: {enabled: false},
  tasks: {enabled: false},
})
