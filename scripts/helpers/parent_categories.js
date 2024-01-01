/**
 * Butterfly
 * for aside categories
 */

'use strict'

hexo.extend.helper.register('parent_categories', function () {
  // 分类归档页面才可以调用
  if (!this.is_category()) return "not page of category"

  const pagePath = this.page.path
  hexo.log.debug('parent_categories: pagePath =', pagePath)
  const categories = this.site.categories
  if (!categories || !categories.length) return 'categories is empty'
  hexo.log.debug('parent_categories: categories.length =',categories.length)

  // 根据页面路径获取当前分类
  const getCurrent = function () {
    let current = null
    categories.map(function (category) {
      if (pagePath.indexOf(category.path) == 0) {
        current = category
        return
      }
    })
    return current
  }
  const current = getCurrent()
  hexo.log.debug('parent_categories: current =', current)
  if (!current) return  "current categories is empty"

  // 获取所有父级分类
  let html = ''
  let parentId = current.parent
  let category = {}
  do {
    category = categories.findOne({_id: parentId})
    if (category) {
      html = `<a class="card-category-list-link" href="${this.url_for(category.path)}">${category.name}</a><span class="article-meta-label"> - </span>` + html
      parentId = category.parent
    } else {
      parentId = ''
    }
    hexo.log.debug('parent_categories: parentId =', parentId)
  } while (parentId);


  return html
})
