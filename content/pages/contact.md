---
hide_title: false
layout: advanced
sections:
  - content: To get in touch please fill the form below.
    form_action: /thank-you
    form_fields:
      - default_value: Your name
        input_type: text
        is_required: true
        label: Name
        name: name
        type: form_field
      - default_value: Your email address
        input_type: email
        is_required: true
        label: Email
        name: email
        type: form_field
      - default_value: Please select
        input_type: select
        label: Subject
        name: subject
        options:
          - Error on the site
          - Sponsorship
          - Other
        type: form_field
      - default_value: Your message
        input_type: textarea
        label: Message
        name: message
        type: form_field
      - input_type: checkbox
        label: >-
          I understand that this form is storing my submitted information so I
          can be contacted.
        name: consent
        type: form_field
    form_id: contactForm
    section_id: contact-form
    submit_label: Send Message
    type: section_form
seo:
  description: This is the contact page
  extra:
    - keyName: property
      name: 'og:type'
      value: website
    - keyName: property
      name: 'og:title'
      value: Contact
    - keyName: property
      name: 'og:description'
      value: This is the contact page
    - name: 'twitter:card'
      value: summary
    - name: 'twitter:title'
      value: Contact
    - name: 'twitter:description'
      value: This is the contact page
  title: Contact
  type: stackbit_page_meta
stackbit_url_path: /contact
title: Contact
---
