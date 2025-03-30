import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function DELETE(req, { params }) {
  
    const { id } = params
    const urlData = path.join(process.cwd(), 'data', 'cajeras.json')
    const cajeras = JSON.parse(fs.readFileSync(urlData, 'utf-8'))
    const deleteCajera = cajeras.filter(cajera => cajera.id !== parseInt( id, 10))

    fs.writeFileSync(urlData, JSON.stringify(deleteCajera, null, 2))
    return NextResponse.json(deleteCajera)
}
