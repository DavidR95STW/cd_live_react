const recursosEstaticos = import.meta.glob('../assets/**/*.{png,jpg,jpeg,webp,svg,mp4,webm,mp3}', {
  eager: true,
  import: 'default',
})

function normalizarRuta(ruta) {
  if (typeof ruta !== 'string' || ruta.length === 0) {
    return ''
  }
  if (ruta.startsWith('img/')) {
    return `images/${ruta.slice(4)}`
  }
  return ruta
}

export function obtenerAsset(ruta, { optional = false } = {}) {
  const rutaNormalizada = normalizarRuta(ruta)
  if (!rutaNormalizada) {
    if (!optional && ruta) {
      console.warn(`[assets] Ruta inválida: ${String(ruta)}`)
    }
    return ''
  }

  const clave = `../assets/${rutaNormalizada}`
  const recurso = recursosEstaticos[clave]

  if (!recurso) {
    if (!optional) {
      console.warn(`[assets] No se encontró el recurso: ${ruta}`)
    }
    return ''
  }

  return recurso
}
