import S from '@sanity/desk-tool/structure-builder'
import React from 'react'
import Emoji from 'react-emoji-render'

export default () =>
  S.list()
    .title('Rebees Admin')
    .items([
      S.listItem()
        .title('Home')
        .icon(() => <Emoji style={{ fontSize: 30 }} text="🏡" />)
        .child(
          S.editor()
            .id('home')
            .schemaType('home')
            .documentId('homepage'),
        ),
      S.listItem()
        .title('Projects Page')
        .icon(() => <Emoji style={{ fontSize: 30 }} text="✨" />)
        .child(
          S.editor()
            .id('projects')
            .schemaType('projects')
            .documentId('projectspage'),
        ),
      S.listItem()
        .title('People Page')
        .icon(() => <Emoji style={{ fontSize: 30 }} text="🤠" />)
        .child(
          S.editor()
            .id('people')
            .schemaType('people')
            .documentId('peoplepage'),
        ),
      S.listItem()
        .title('Opportunities Page')
        .icon(() => <Emoji style={{ fontSize: 30 }} text="📈" />)
        .child(
          S.editor()
            .id('opportunities')
            .schemaType('opportunities')
            .documentId('opportunitiespage'),
        ),
      S.listItem()
        .title('Careers Page')
        .icon(() => <Emoji style={{ fontSize: 30 }} text="💸" />)
        .child(
          S.editor()
            .id('Careers')
            .schemaType('careers')
            .documentId('careerspage'),
        ),
      S.listItem()
        .title('Tenants Page')
        .icon(() => <Emoji style={{ fontSize: 30 }} text="🏙️" />)
        .child(
          S.editor()
            .id('Tenants')
            .schemaType('tenants')
            .documentId('tenantspage'),
        ),
      S.listItem()
        .title('Partner Page')
        .icon(() => <Emoji style={{ fontSize: 30 }} text="🤝" />)
        .child(
          S.editor()
            .id('Partners')
            .schemaType('partners')
            .documentId('partnerspage'),
        ),
      S.listItem()
        .title('Global Configuration')
        .icon(() => <Emoji style={{ fontSize: 30 }} text="💕" />)
        .child(
          S.editor()
            .id('config')
            .schemaType('config')
            .documentId('global-config'),
        ),

      S.divider(),

      S.listItem()
        .title('Projects')
        .icon(() => <Emoji style={{ fontSize: 30 }} text="🎨" />)
        .child(S.documentTypeList('project').title('Projects')),
      S.listItem()
        .title('People')
        .icon(() => <Emoji style={{ fontSize: 30 }} text="🤸‍" />)
        .child(S.documentTypeList('person').title('People')),
      S.listItem()
        .title('Careers')
        .icon(() => <Emoji style={{ fontSize: 30 }} text="👩‍💼" />)
        .child(S.documentTypeList('career').title('Careers')),
      S.listItem()
        .title('Tenant Vacancies')
        .icon(() => <Emoji style={{ fontSize: 30 }} text="🥑" />)
        .child(S.documentTypeList('tenantVacancy').title('Tenant Vacancies')),
      S.listItem()
        .title('Categories')
        .icon(() => <Emoji style={{ fontSize: 30 }} text="🐱" />)
        .child(S.documentTypeList('category').title('Categories')),
      S.listItem()
        .title('Locations')
        .icon(() => <Emoji style={{ fontSize: 30 }} text="🌎" />)
        .child(S.documentTypeList('location').title('Locations')),
    ])
