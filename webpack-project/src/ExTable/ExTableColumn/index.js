import { TableColumn } from 'element-ui'
// import {
//   parseMinWidth
// } from 'element-ui/packages/table/src/util.js'
import { max, map, isEmpty } from './util'

export default {
  name: 'ExTableColumn',
  extends: TableColumn,
  props: {
    fitByClass: {
      type: String,
      default: 'cell'
    },
    autoFit: {
      type: Boolean,
      default: false
    },
    fitGap: {
      type: Number,
      default: 0
    },
    actions: {
      type: Boolean,
      default: false
    },
    filteredData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      autoWidth: 0
    }
  },
  computed: {
    realMinWidth () {
      if (this.autoFit) {
        return ''
      }
      return TableColumn.computed.realMinWidth.call(this)
    }
  },
  methods: {
    updateAutoWidth () {
      if (!this.autoFit) return

      let cells = window.document.querySelectorAll(`td.${this.columnId} .${this.fitByClass}`)
      if (isEmpty(cells)) {
        cells = window.document.querySelectorAll(`td.${this.columnId} .cell`)
      }
      if (isEmpty(cells)) {
        return
      }

      const autoMinWidth = max(map(cells, item => item.getBoundingClientRect().width)) + this.fitGap + 1

      if (this.autoWidth !== autoMinWidth) {
        this.autoWidth = autoMinWidth
      }
    }
  },
  updated () {
    this.updateAutoWidth()
  },
  mounted () {
    this.$nextTick(this.updateAutoWidth)
  },
  watch: {
    filteredData (newVal) {
      if (this.actions) {
        this.$nextTick(this.updateAutoWidth)
      }
    }
  }
}
