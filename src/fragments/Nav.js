import React from 'react'

function Nav() {
  return (
    <nav>
      <ul>
        <li><a href="/">루트</a></li>
        <li><a href="/list2">루트(훅)</a></li>
        <li><a href="/list3">루트(swr)</a></li>
        <li><a href="/write">작성(빈입력)</a></li>
        <li><a href="/write2">작성(패턴)</a></li>
        <li><a href="/write3">작성</a></li>
      </ul>
    </nav>
  )
}

export default Nav