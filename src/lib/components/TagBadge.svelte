<script lang="ts">
	let { label } = $props<{ label: string }>();
</script>

<span class="tag-badge">{label}</span>

<style>
	.tag-badge {
		display: inline-flex;
		align-items: center;
		border-radius: 999px;
		padding: 0.35rem 0.65rem;
		background: rgba(255, 255, 255, 0.14);
		color: #eef4ff;
		font-size: 0.72rem;
		font-weight: 800;
		line-height: 1;
		white-space: nowrap;
	}
</style>
