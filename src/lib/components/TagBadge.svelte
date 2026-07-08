<script lang="ts">
	type Props = {
		label: string;
	};

	let { label }: Props = $props();
</script>

<span class="tag-badge">{label}</span>

<style>
	.tag-badge {
		display: inline-flex;
		align-items: center;
		border: 1px solid rgba(255, 255, 255, 0.28);
		border-radius: 999px;
		padding: 0.35rem 0.7rem;
		background: rgba(255, 255, 255, 0.14);
		color: #f8fafc;
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.01em;
	}
</style>
