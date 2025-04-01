import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const urlData = path.join(process.cwd(), 'data', 'cajeras.json');
const cajeras = JSON.parse(fs.readFileSync(urlData, 'utf-8'));

export async function PUT(req, context) {
    try {

        const params = await context.params;  
        const { id } = params; 

        const { horarios } = await req.json();

        const cajeraIndex = cajeras.findIndex(cajera => cajera.id === parseInt(id, 10));

        if (cajeraIndex !== -1) {
            cajeras[cajeraIndex].horarios = horarios;
            fs.writeFileSync(urlData, JSON.stringify(cajeras, null, 2));
            return NextResponse.json({ message: 'Horarios actualizados', data: cajeras[cajeraIndex] });
        } else {
            return NextResponse.json({ error: 'Cajera no encontrada' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error en PUT:', error);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}
