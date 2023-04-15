import Link from 'next/link'

export default function _404() {
    return (
        <div>
          <h1>Site not found</h1>
          <Link href="/todos">The page is not found!</Link>
        </div>
      );
  }