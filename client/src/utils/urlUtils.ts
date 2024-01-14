export function isValidUrl(url: string): boolean {
   try {
      const pattern = new RegExp(
         '^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$',
         'i',
      ) // fragment locator
      if (!pattern.test(url)) {
         return false
      }
      return true
   } catch (error) {
      return false
   }
}

export function getDomainFromUrl(url: string): string | null {
   try {
      const isValid = isValidUrl(url)
      if (!isValid) {
         return 'Enter the Domain Name'
      }
      const withoutProtocol = url.replace(/^(.*:\/\/)?/, '')
      const withoutPathAndQuery = withoutProtocol.split('/')[0]
      const parts = withoutPathAndQuery.split('.')
      const domain = parts.length > 1 ? parts[parts.length - 2] : parts[0]
      return domain.charAt(0).toUpperCase() + domain.slice(1)
   } catch (error) {
      console.error(error)
      return null
   }
}

export function extractBaseUrl(fullUrl: string): string {
   const isValid = isValidUrl(fullUrl)
   if (!isValid) {
      return ''
   }
   const url = fullUrl.replace(/^(.*:\/\/)?/, '')
   const baseUrl = url.split('/')[0]
   return baseUrl
}
