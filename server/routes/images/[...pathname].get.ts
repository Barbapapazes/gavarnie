export default eventHandler(async (event) => {
  const { pathname } = getRouterParams(event)

  if (!pathname) {
    return createError({
      statusCode: 404,
      statusMessage: 'Not Found',
    })
  }

  return hubBlob().serve(event, pathname)
})
