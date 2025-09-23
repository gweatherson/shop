import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Link, useLoaderData} from 'react-router';
import {type Product} from '@shopify/hydrogen/storefront-api-types';
import {PortableText} from '@portabletext/react';
import {type SanityDocument} from '@sanity/client';

export async function loader({
  params,
  context: {storefront, sanity},
}: LoaderFunctionArgs) {
  const {product} = await storefront.query<{product: Product}>(
    `#graphql
      query Product($handle: String!) {
        product(handle: $handle) { id title }
      }
    `,
    {
      variables: {handle: params.handle},
    },
  );

  const query = `*[_type == "product" && store.slug.current == $handle][0]{
      body,
      "image": store.previewImageUrl
  }`;
  const initial = await sanity.loadQuery<SanityDocument>(query, params);

  return {
    product,
    initial
  };
}

export default function Product() {
  const {product, initial} = useLoaderData<typeof loader>();
  const page = initial.data;

  return (
    <div className="mx-auto p-12 prose prose-xl prose-a:text-blue-500">
      <h1 className="text-3xl font-bold">{product.title}</h1>

      <img
        alt={product.title}
        src={page?.image}
        className=""
        style={{maxWidth: '300px'}}
      />

      {page?.body?.length > 0 ? <PortableText value={page.body} /> : null}

      <Link to="/collections/all">&larr; Back to All Products</Link>
    </div>
  );
}