import Link from "next/link";
import { siteUrl } from "@/content/site";
import { JsonLd } from "./JsonLd";

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl("/") },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        ...(item.href ? { item: siteUrl(item.href) } : {}),
      })),
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <div className="container">
          <ol>
            <li><Link href="/">Home</Link></li>
            {items.map((item, index) => {
              const current = index === items.length - 1;
              return (
                <li key={item.label}>
                  {item.href && !current
                    ? <Link href={item.href}>{item.label}</Link>
                    : <span aria-current={current ? "page" : undefined}>{item.label}</span>}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
}
