# Formspree notification email template

The website now sends form-specific subjects and formal field names. Examples include `[ECL] Organization Challenges`, `Full Name`, `Organization Name`, `Organization Challenge`, and `Privacy Consent`. Blank optional answers are omitted and checkbox answers are sent as `Yes` or `No`.

Formspree controls the visual styling of its notification emails. Bold labels and answers require a Formspree custom submission-notification template, currently a Business-plan feature.

## Apply the template

1. In Formspree, open the Ethical Capacity Lab project.
2. Open **Project Settings**, then **Templates**.
3. Select **New Template** and choose **Submission Notification**.
4. Name it `ECL Form Notification`.
5. Set the template subject to `{{ subject }}` so the website's form-specific subject remains in use.
6. Paste the HTML and CSS below into their respective editors.
7. Preview, deploy, and select this template in each form's **Settings** tab.

## HTML

```html
<div class="email-shell">
  <p class="eyebrow">THE ETHICAL CAPACITY LAB</p>
  <h1>{{ subject }}</h1>
  <p class="intro">A new website form was submitted for human review.</p>

  <div class="fields">
    {{# _fields }}
    <div class="field">
      <div class="field-label">{{ _name }}</div>
      <div class="field-value">{{ _value }}</div>
    </div>
    {{/ _fields }}
  </div>

  <p class="submitted-at">Submitted: {{ _time }}</p>
  <p class="footer"><a href="{{ _unsubscribe }}">Manage notification preferences</a></p>
</div>
```

## CSS

```css
body {
  margin: 0;
  background: #f6f1e7;
  color: #2a2823;
  font-family: Arial, Helvetica, sans-serif;
}

.email-shell {
  max-width: 680px;
  margin: 0 auto;
  padding: 36px;
  background: #fffdf8;
}

.eyebrow {
  margin: 0 0 10px;
  color: #a9762f;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
}

h1 {
  margin: 0 0 12px;
  font-size: 26px;
  line-height: 1.25;
}

.intro {
  margin: 0 0 28px;
  color: #5b564a;
}

.field {
  padding: 16px 0;
  border-top: 1px solid #c9c2b0;
}

.field-label {
  margin-bottom: 6px;
  color: #5b564a;
  font-size: 13px;
  font-weight: 700;
  text-transform: capitalize;
}

.field-value {
  color: #2a2823;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.5;
  white-space: pre-wrap;
}

.submitted-at,
.footer {
  margin-top: 24px;
  color: #5b564a;
  font-size: 12px;
}
```

If the Formspree account does not include custom templates, the improved subjects and formal field names still work, but the font weight remains controlled by Formspree's default email design.
