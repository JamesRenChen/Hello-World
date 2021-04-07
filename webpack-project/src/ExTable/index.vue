<template>
    <div 
        class="yon-combine-table"
    >
        <el-table
            style="width: 600px"
            :data="tableData"
        >
            <el-table-column
                prop="date"
                label="日期"
                width="180"
            >
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="180"
            >
            </el-table-column>
            <el-table-column
                prop="address"
                label="地址"
            >
            </el-table-column>
            <ex-table-column
                prop="actions"
                fitByClass="auto-fit-target"
                :autoFit="true"
                :fitGap="50"
                :actions="true"
                :filteredData="filteredData"
                label="操作"
                min-width="50"
                fixed="right"
            >
                <div class="column-wrapper" slot-scope="scope">
                    <el-button :scope="scope">点点点</el-button>
                </div>
            </ex-table-column>
        </el-table>
    </div>
</template>

<script>
    import ExTableColumn from './ExTableColumn'

    export default {
        name: 'YonCombineTable',
        inheritAttrs: false,
        components: {
            ExTableColumn,
        },
        props: {
        },
        data () {
            return {
                filteredData: [],
                tableData: [
                    {
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄'
                    }, {
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄'
                    }, {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1516 弄'
                    }
                ]
            }
        },
        created () {
        },
        mounted () {
        },
        methods: {
        },
        watch: {
        },
    }
</script>

<style lang="less">
</style>
