
import CMS from 'netlify-cms-app';
import React, { Component } from 'react';

// Import main site styles as a string to inject into the CMS preview pane
import styles from "!to-string-loader!css-loader!postcss-loader!sass-loader!../css/main.css";

import HomePreview from "./cms-preview-templates/home";
import PostPreview from "./cms-preview-templates/post";
import ProductsPreview from "./cms-preview-templates/products";
import ValuesPreview from "./cms-preview-templates/values";
import ContactPreview from "./cms-preview-templates/contact";

CMS.registerPreviewStyle(styles, { raw: true });
CMS.registerPreviewTemplate("home", HomePreview);
CMS.registerPreviewTemplate("post", PostPreview);
CMS.registerPreviewTemplate("products", ProductsPreview);
CMS.registerPreviewTemplate("values", ValuesPreview);
CMS.registerPreviewTemplate("contact", ContactPreview);
CMS.registerEditorComponent({
    id: "CloudIntro",
    label: "Cloud Intro",
    fields: [{
            name: "provider",
            label: "Provider Name",
            widget: "select",
            options: ["AWS", "Azure"]

    }],
    pattern: /{{< cloud-intro ([a-zA-Z0-9]+) >}}/,
    fromBlock: function(match) {
        return {
            provider: match[1]
        };
    },
    toBlock: function(obj) {
        return `{{< cloud-intro "${obj.provider}">}}`;
    },
    toPreview: function(obj) {
        return `<div>
        <p>
            Pulumi's infrastructure-as-code SDK helps you create, deploy, and manage "$(obj.provider)" containers,
            serverless functions, and infrastructure using real programming languages. The Pulumi "$(obj.provider)" provider packages
            and <a href="{{ relref . "/contact" }}">CLI</a>
            help you accomplish all these within minutes.
        </p>
        <p>
            This guide will have you quickly provisioning infrastructure on "$(obj.provider)" with Pulumi in your
            favorite language.
        </p>
    </div>
    }}`;
    },
});
CMS.init();